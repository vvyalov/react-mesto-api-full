function Entrance(props) {

  return (
    <form className="entrance" onSubmit={props.onSubmit}>
      <h2 className="entrance__title">{props.title}</h2>
      {props.children}
      <button type="submit" className="entrance__button">{props.buttonText}</button>
    </form>
  );
}

export default Entrance;
