import ReactGA from "react-ga4";

const initializeGA = () => {
  ReactGA.initialize("G-K9Q7T63R83");
  console.log("GA INITIALIZED");
};

export default initializeGA;
export { initializeGA };
