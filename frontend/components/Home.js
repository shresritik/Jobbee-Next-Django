import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import JobItem from "./job/JobItem";
import Pagination from "react-js-pagination";
import Filters from "./layout/Filters";
const Home = ({ data }) => {
  const router = useRouter();
  let { page = 1, keyword } = router.query;
  page = Number(page);
  let queryParams;
  if (typeof window !== "undefined") {
    // accessing the query in browser
    queryParams = new URLSearchParams(window.location.search);
  }
  const handlePerClick = (currentPage) => {
    if (queryParams.has("page")) {
      queryParams.set("page", currentPage);
    } else {
      queryParams.append("page", currentPage);
    }
    router.push({ search: queryParams.toString() });
  };
  const { jobs, count, resPerPage } = data;
  return (
    <div className="container container-fluid">
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <Filters />
        </div>

        <div className="col-xl-9 col-lg-8 content-left-offset">
          <div className="my-5">
            <h4 className="page-title">
              {keyword
                ? `${jobs.length} Results for ${keyword}`
                : "Latest Jobs"}
            </h4>
            <Link href="/stats">
              <button className="btn btn-secondary float-right stats_btn">
                Get Topic stats
              </button>
            </Link>
            <div className="d-block">
              <Link href="/search">Go to Search</Link>
            </div>
          </div>
          {jobs && jobs.map((job) => <JobItem key={job.id} job={job} />)}
          {resPerPage < count && (
            <div className="d-flex.justify-content-center  mt-5">
              <Pagination
                activePage={page}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
                onChange={handlePerClick}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
