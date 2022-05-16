import axios from "axios";
import JobDetails from "../../components/job/JobDetails";
import Layout from "../../components/layout/Layout";
import NotFound from "../404";
export default function JobDetailsPage({ job, candidates, error }) {
  if (error?.includes("Not found")) return <NotFound />;
  return (
    <Layout title={job.title}>
      <JobDetails job={job} candidates={candidates} />
    </Layout>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(
      `${process.env.API_URL}/api/jobs/${params.id}/`
    );
    console.log(res.data);
    const job = res.data.job;
    const candidates = res.data.candidates;
    return {
      props: {
        job,
        candidates,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail,
      },
    };
  }
}
