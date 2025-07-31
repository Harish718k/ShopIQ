// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom'

// export default function Search () {

//     const navigate = useNavigate();
//     const location = useLocation();
//     const [keyword, setKeyword] = useState("")

//     const searchHandler = (e) => {
//         e.preventDefault();
//         navigate(`/search/${keyword}`)

//     }

//     const clearKeyword = () =>{
//         setKeyword("");
//     }

//     useEffect(() => {
//         if(location.pathname === '/') {
//             clearKeyword();
//         }
//     },[location])

//     return (
//         <form onSubmit={searchHandler}>
//             <div className="input-group">
//                 <input
//                 type="text"
//                 id="search_field"
//                 className="form-control"
//                 placeholder="Enter Product Name ..."
//                 onChange={(e)=>{ setKeyword(e.target.value) }}
//                 value={keyword}
//                 />
//                 <div className="input-group-append">
//                 <button id="search_btn" className="btn">
//                     <i className="fa fa-search" aria-hidden="true"></i>
//                 </button>
//                 </div>
//             </div>
//         </form>
//     )
// }

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  const clearKeyword = () => {
    setKeyword('');
  };

  useEffect(() => {
    if (location.pathname === '/') {
      clearKeyword();
    }
  }, [location]);

  return (
    <form onSubmit={searchHandler}>
      <div className="flex w-full max-w-md border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          id="search_field"
          className="flex-1 px-4 py-2 text-sm text-gray-800 outline-none"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <div  className="flex  items-center px-4 bg-primary text-white hover:bg-primary-dark cursor-pointer">
          <button id="search_btn"  className="focus:outline-none" type="submit">
            <SearchIcon size={18} />
          </button>
        </div>
      </div>
    </form>
  );
}
