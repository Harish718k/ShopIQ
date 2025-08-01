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
    if (!keyword.trim()) {
      return;
    }
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
      <div className="flex w-full border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          id="search_field"
          className="flex-1 px-4 py-2 text-sm text-white outline-none md:w-md"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
          <button id="search_btn"  className="focus:outline-none flex  items-center px-4 bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer" type="submit">
            <SearchIcon size={18} />
          </button>
      </div>
    </form>
  );
}
