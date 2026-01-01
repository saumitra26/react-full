const Greet = ({ name }: { name?: string }) => {
  return (
    <>
      <p>Add</p>
      {name ? <h1>Hello {name}</h1> : <button>Login</button>}
    </>
  );
};

export default Greet;
