import { useState, useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import * as S from "../css/HomePageStyle";
import { getUser, setUser } from "../Helper/Storage";
import { GetMovieDetailsRequest } from "../Services";
import { CgMenu, CgCloseR } from "react-icons/cg";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Loader from "../Component/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  changeFavorite,
  storeMovieList,
  updateMovieList,
} from "../ToolKit/Slice/movieSlice";

const Home = (props) => {
  const dispatch = useDispatch();

  // const [movieList, setMovieList] = useState([])
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //redux state
  const movieList = useSelector((state) => state?.movieSlice.movieList);

  //style...
  const closeIcon = {
    fontSize: 30,
    margin: 10,
    color: "white",
    alignSelf: "flex-end",
  };
  const fillFavIcon = {
    fontSize: 30,
    margin: 10,
    color: "red",
  };

  //api
  const apiCall = async () => {
    setIsLoading(true);
    const data = await GetMovieDetailsRequest(page);
    if (page <= data?.total_pages) {
      dispatch(storeMovieList(data.results));
      // setMovieList([...movieList, ...data.results])
      setIsLoading(false);
    } else {
      setHasMore(false);
    }
  };

  //lifecycle method
  useEffect(() => {
    window.onscroll = () => {
      if (
        window.innerHeight + Math.ceil(document.documentElement.scrollTop) ===
          document.documentElement.offsetHeight &&
        hasMore
      ) {
        setPage(page + 1);
      }
    };
  });

  useEffect(() => {
    const movieData = localStorage.getItem("movieList");
    const pageNumber = localStorage.getItem("page");
    const position = localStorage.getItem("pageYOffset");

    if (movieData && position) {
      dispatch(updateMovieList(JSON.parse(movieData)));
      // setMovieList(JSON.parse(movieData))
      setPage(Number(pageNumber));
      setTimeout(() => {
        window[`scrollTo`]({ top: position, behavior: "auto" });
        localStorage.removeItem("movieList");
        localStorage.removeItem("page");
        localStorage.removeItem("pageYOffset");
      }, 500);
    }
  }, []);

  useEffect(() => {
    const movieData = localStorage.getItem("movieList");
    if (!movieData) {
      apiCall();
    }
  }, [page]);

  //function..
  const onClickCard = () => {
    localStorage.setItem("pageYOffset", window.pageYOffset);
    localStorage.setItem("page", page);
    localStorage.setItem("movieList", JSON.stringify(movieList));
    props.history?.push("/movie");
  };

  const onClickFav = (index, e) => {
    dispatch(changeFavorite(index));
    e.stopPropagation();
  };

  const MovieList = () => (
    <S.ItemContainer>
      {movieList?.map((item, index) => (
        <S.ItemWrapper
          onClick={onClickCard}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item?.poster_path})`,
          }}
          key={index.toString()}
        >
          {item.isFavorite ? (
            <AiFillHeart
              onClick={(e) => onClickFav(index, e)}
              style={fillFavIcon}
            />
          ) : (
            <AiOutlineHeart
              onClick={(e) => onClickFav(index, e)}
              style={closeIcon}
            />
          )}
        </S.ItemWrapper>
      ))}
    </S.ItemContainer>
  );

  return (
    <S.Container>
      <Loader show={isLoading} />
      <MovieList />
    </S.Container>
  );
};
export default Home;
