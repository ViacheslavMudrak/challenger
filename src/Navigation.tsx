import config from 'sitecore.config';
// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = config.publicUrl;

const Navigation = (): React.JSX.Element => (
  <div>
    <nav>
      <ul>
        <li>
          <a href="https://sitecore.com">
            <img src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Navigation;
