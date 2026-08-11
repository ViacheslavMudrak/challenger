import { Meta } from '@storybook/react';

const meta = {
  title: 'Components/Rich Text',
  parameters: {
    layout: 'fullscreen',
    jest: [],
  },
  argTypes: {},
  args: {},
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

const Heading1 = () => {
  return <h1 className="rt-heading1">Heading 1: Sample text here</h1>;
};

const Heading2 = () => {
  return <h2 className="rt-heading2">Heading 2: Sample text here</h2>;
};

const Heading3 = () => {
  return <h3 className="rt-heading3">Heading 3: Sample text here</h3>;
};

const TableTemplate1 = () => {
  return (
    <table className="rt-table-template1">
      <thead>
        <tr>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>5.05%</td>
          <td>$70,482 per year</td>
        </tr>
        <tr>
          <td>5.05%</td>
          <td>$70,482 per year</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>
            Source: Association of Superannuation Funds of Australia (ASFA) - Retirement Standards,
            March Quarter 2022
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

const TableTemplate2 = () => {
  return (
    <table className="rt-table-template2">
      <thead>
        <tr>
          <th>Event</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Event A</td>
          <td>Dec 15, 2024</td>
        </tr>
        <tr>
          <td>Event B</td>
          <td>Oct 23, 2024</td>
        </tr>
        <tr>
          <td>Event C</td>
          <td>May 31, 2024</td>
        </tr>
      </tbody>
    </table>
  );
};

const ArticleSection1 = () => {
  return (
    <div className="rt-article-section1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in gravida lectus, a accumsan
      ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <a href="/">link here</a>
    </div>
  );
};

const ArticleSection2 = () => {
  return (
    <div className="rt-article-section2">
      <h3>Heading</h3>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in gravida lectus, a accumsan
      ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <a href="/">link here</a>
    </div>
  );
};

const CustomList1 = () => {
  return (
    <ul className="rt-custom-list">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  );
};

const CustomList2 = () => {
  return (
    <ul className="rt-custom-list2">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  );
};

export const Default = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-start gap-6 bg-white p-10">
      <Heading1 />
      <Heading2 />
      <Heading3 />
      <TableTemplate1 />
      <TableTemplate2 />
      <ArticleSection1 />
      <ArticleSection2 />
      <CustomList1 />
      <CustomList2 />
    </div>
  );
};
