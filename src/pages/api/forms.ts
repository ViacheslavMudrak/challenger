import type { NextApiRequest, NextApiResponse } from 'next';

const formsApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST') {
    try {
      console.log('RECEIVED DATA', req.body);
      const url = process.env.PROSPECT_API || '';
      const apiKey = process.env.PROSPECT_KEY || '';
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Api-Key': apiKey,
      };
      const formData = await processFormData(req.body);
      console.log('FORM DATA', formData);
      const prospectRes = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers,
      });
      const jsonRes = await prospectRes.json();

      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', '*'); // replace this your actual origin
      res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      );

      console.log('RESPONSE', JSON.stringify(jsonRes));
      if (!jsonRes.success) {
        return res.status(400).json({ message: 'Failed to submit data to prospect api.' });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, error: 'Failed to submit form values.' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid method used.' });
  }
};

const processFormData = (data: JSON) => {
  let newData = '';
  let options = '';
  let conditions = '';

  Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    console.log(`${key}: ${value}`);

    if (key.startsWith('option.')) {
      const newKey = key.replace('option.', '');
      if (value.length > 0) {
        if (options !== '') {
          options = `${options}, `;
        }
        const newValue = value?.toString()?.replaceAll(',', ';');
        options = options.concat(`{ "key": "${newKey}", "value": "${newValue}" }`);
      }
    } else if (key.startsWith('if.')) {
      const condition = key.split('.', 3);
      if (conditions !== '') {
        conditions = `${conditions}, `;
      }
      if (value) {
        conditions = conditions.concat(`"${condition[1]}": "${condition[2]}"`);
      }
    } else if (key.startsWith('boolean.')) {
      const bool = key.split('.', 3);
      if (newData !== '') {
        newData = `${newData}, `;
      }
      newData = newData.concat(`"${bool[1]}": ${bool[2]}`);
    } else if (key.startsWith('g-recaptcha')) {
      // ignore and move to the next
    } else {
      if (newData !== '') {
        newData = `${newData}, `;
      }
      newData = newData.concat(`"${key}": "${value}"`);
    }
  });

  let jsonStr = `${newData}`;
  if (options != '') {
    jsonStr = jsonStr.concat(`, "options": [ ${options} ]`);
  }

  const jsonData = JSON.parse(`{ ${jsonStr} }`);
  const jsonConditions = JSON.parse(`{ ${conditions} }`);

  Object.entries(jsonData).forEach((entry) => {
    const [key] = entry;

    Object.entries(jsonConditions).forEach((obj) => {
      const [objKey, objValue] = obj;
      if (key === objKey) {
        jsonData[key] = objValue;
      }
    });
  });

  return jsonData;
};

export default formsApi;
