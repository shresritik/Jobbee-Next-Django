import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const UploadResume = ({ access_token }) => {
  const router = useRouter();
  const [resume, setResume] = useState(null);
  const { uploadResume, uploaded, setUploaded, loading, error, clearErrors } =
    useContext(AuthContext);
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
    if (uploaded) {
      setUploaded(false);
      toast.success("Your resume is uploaded succesfully.");
    }
  }, [error, uploaded]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", resume);
    uploadResume(formData, access_token);
  };
  const onChange = (e) => {
    setResume(e.target.files[0]);
  };
  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/resume-upload.svg" alt="resume" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h3> UPLOAD RESUME </h3>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-upload"></i>
                  <input
                    type="file"
                    name="resume"
                    id="customFile"
                    accept="application/pdf"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="uploadButtonWrapper">
                <button type="submit" className="uploadButton">
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
