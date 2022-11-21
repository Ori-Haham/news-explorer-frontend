export default function Button(props) {
  return (
    <button
      className={
        props.place === 'SearchSection'
          ? 'button button_place_search-section'
          : 'button header__button'
      }
    >
      {props.text}
    </button>
  );
}
