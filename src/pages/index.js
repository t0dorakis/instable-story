import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentLoader from "react-content-loader";
import Api from "../services/api";
import Layout from "../components/Layout";
import { SubmitButton, Button } from "../components/Button";

const imageWidth = 350;

const StyledToastContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
    font-family: "Menlo", "Courier New", Menlo, Courier, monospace;
    font-size: 15px;
  }
  .Toastify__toast {
    font-family: "Menlo", "Courier New", Menlo, Courier, monospace;
    font-size: 15px;
    box-shadow: none;
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;

const ImageContentLoader = () => (
  <ContentLoader
    style={{ marginBottom: 15 + "px" }}
    viewBox={`0 0 ${imageWidth} ${imageWidth * 0.675}`}
  >
    {/* Only SVG shapes */}
    <rect
      x="0"
      y="0"
      rx="5"
      ry="5"
      width={imageWidth}
      height={imageWidth * 0.675}
    />
  </ContentLoader>
);

const Image = styled.img`
  width: ${imageWidth}px;
  height: ${imageWidth * 0.675}px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 15px;
`;

const SceneWrapper = styled.div`
  display: flex;
  /* flex-direction: row; */
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 100%;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 100vw;
`;

const SroryCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
  background-color: white;
  min-height: 450px;
  border-radius: 2px;
`;

const B = styled.b`
  font-weight: normal;
  color: #989898;
`;

const Paragraph = styled.p`
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  max-width: ${imageWidth}px;
`;

const StoryCard = ({ script, ready }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (script && !image) {
      Api.getSceneImage(script).then((image) => {
        setImage(image);
        ready();
      });
    }
  }, [script]);

  return (
    <SroryCardWrapper>
      {image ? (
        <Image src={image.image} alt={image.prompt} />
      ) : (
        <ImageContentLoader />
      )}
      <Paragraph>
        <B>Plot:</B> {script.plot}
      </Paragraph>
      <Paragraph>
        <B>Scenery: </B>
        {script.scene}
      </Paragraph>
      <Paragraph>
        <B>Light:</B> {script.lighting}
      </Paragraph>
      {/* <Paragraph>
        <B>Camera:</B> {script.camera}
      </Paragraph> */}
    </SroryCardWrapper>
  );
};

const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: white;
`;
const Note = styled.textarea`
  width: ${imageWidth}px;
  min-height: 450px;
  font-size: 15px;
  line-height: 22px;
  border: none;
  background: repeating-linear-gradient(white, white 21px, #9198e5 22px);
  &::placeholder {
    color: #989898;
  }
  &:focus {
    outline: none;
  }
  /* padding: 19px; */
`;

const Label = styled.label`
  font-size: 15px;
  color: #989898;
`;

const H1 = styled.h1`
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 50px;
  line-height: 120%;
`;

const IndexPage = () => {
  const initialInput =
    "A family trying to survive the great famine of the 20s.";
  const [script, setScript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(initialInput);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const scriptResponse = await toast.promise(Api.getScript(inputValue), {
        pending: "Writing your screenplay... this may take a while...",
        success: "Screenplay written! Pictures are loading...",
        error: "Something went wrong. I might be out of credits...",
      });
      setScript(scriptResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    console.log("reset");
    setInputValue(initialInput);
    setScript(null);
    setLoading(false);
    toast(
      ({ closeToast }) => (
        <>
          This is a pure fun project. If you like it, please <br />
          <a
            target="_blank"
            href="https://paypal.me/theodorhillmann?country.x=DE&locale.x=de_DE"
          >
            Buy me a coffee
          </a>
          <br />
          to keep this alive :D
        </>
      ),
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  return (
    <Layout>
      <H1>{script ? script[0]?.title : "Create Your Story Board"}</H1>
      <StyledToastContainer />
      <SceneWrapper>
        {script ? (
          script.map((scene, index) => {
            return (
              <StoryCard
                ready={() => setLoading(false)}
                script={scene}
                key={`scene-${index}`}
              />
            );
          })
        ) : (
          <form onSubmit={handleSubmit}>
            <Label>
              Write a screenplay about...
              <NoteWrapper>
                <Note
                  // type="text-area"
                  name="prompt"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </NoteWrapper>
            </Label>
            <SubmitButton loading={loading}>Create Storyboard</SubmitButton>
          </form>
        )}
      </SceneWrapper>
      {script && (
        <Button loading={loading} onClick={() => handleReset()}>
          Let’s do another!
        </Button>
      )}
    </Layout>
  );
};

export default IndexPage;
