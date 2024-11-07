import { MyContext } from "./Context";

function MyAlbum() {
  const { setMyAlbum, divMessage, setFilter } = MyContext();
  return (
    <div className="div-my-album">
      <button
        type="button"
        className="button-div-my-album"
        onClick={() => {
          setMyAlbum(false);
          if (window.innerWidth > 1024) {
            if (!divMessage) {
              setFilter(true);
            }
          }
        }}
      >
        ×
      </button>
    </div>
  );
}

export default MyAlbum;
