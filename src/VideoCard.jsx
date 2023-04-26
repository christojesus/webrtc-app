import { useState, useRef } from "react";
import { Card, Button, Form } from "react-bootstrap";
import Webcam from "react-webcam";

const VideoCard = () => {
  const webcamRef = useRef(null);
  const [videoURL, setVideoURL] = useState(null);

  const handleStartRecording = () => {
    if (!webcamRef.current || !webcamRef.current.stream) {
      console.error(
        "Webcam reference is not defined or stream is not available"
      );
      return;
    }

    const mediaRecorder = new MediaRecorder(webcamRef.current.stream);
    const chunks = [];

    mediaRecorder.addEventListener("dataavailable", (event) => {
      chunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    });

    mediaRecorder.start();
  };

  const handleStopRecording = () => {
    webcamRef.current.video.pause();
    webcamRef.current.stream.getTracks().forEach((track) => track.stop());
  };

  const handleRetake = () => {
    setVideoURL(null);
  };

  const handlePlay = () => {
    webcamRef.current.video.play();
  };

  const handleSendSport = (event) => {
    event.preventDefault();
    console.log("url");
  };

  return (
    <Card>
      <Card.Body>
        {videoURL ? (
          <video src={videoURL} controls />
        ) : (
          <Webcam audio={false} ref={webcamRef} />
        )}
      </Card.Body>
      <Card.Footer>
        {videoURL ? (
          <>
            <Button onClick={handleRetake}>Retake</Button>
            <Button onClick={handlePlay}>Play</Button>
          </>
        ) : (
          <>
            <Button onClick={handleStartRecording}>Start Recording</Button>
            <Button onClick={handleStopRecording}>Stop Recording</Button>
          </>
        )}
        <Form onSubmit={handleSendSport}>
          <Form.Group controlId="sport">
            <Form.Label>What is your favorite sport?</Form.Label>
          </Form.Group>
          <Button type="submit">Send</Button>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default VideoCard;
