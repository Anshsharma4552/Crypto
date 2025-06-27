import React , {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import "./style.css"
export default function PaginationComponent({ page, handlePageChange}) {
  return (
    <div className='pagination-component'>
      <Pagination 
        count={10} 
        page={page} 
        onChange={handlePageChange}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#fff !important",
            border: "1px solid var(--grey)",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "transparent !important",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "var(--blue) !important",
            borderColor: "var(--blue) !important",
            color: "#fff !important",
          },
          "& .MuiPaginationItem-root.Mui-selected:hover": {
            backgroundColor: "var(--blue) !important",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
          },
        }}
        />
    </div>
  );
}