export default function ExternalLink(props) {
  return (
    <a
      className={props.isText ? 'footer__link' : ''}
      href={props.link}
      target='_blank'
    >
      {props.children}
    </a>
  );
}
