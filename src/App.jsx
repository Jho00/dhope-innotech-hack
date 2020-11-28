import React from 'react';

import LinksSubmit from './containers/links-submit';
import ImageSubmit from './containers/image-submit';
import Inputs from './containers/inputs';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const useStyles = makeStyles({
  root: {
    padding: 16,
  },
});

const App = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  let ActiveComponent = React.Fragment;
  let stepSubmit = () => {};
  switch (activeStep) {
    case 0:
      ActiveComponent = LinksSubmit;
      stepSubmit = (data) =>
        new Promise((resolve) => {
          setTimeout(() => {
            console.log(data.links);
            resolve();
          }, 1000);
        });
      break;
    case 1:
      ActiveComponent = ImageSubmit;
      stepSubmit = (data) =>
        new Promise((resolve) => {
          setTimeout(() => {
            console.log(data.image.url);
            resolve();
          }, 1000);
        });
      break;
  }

  const submit = async (event, data) => {
    event.preventDefault();
    setIsLoading(true);
    await stepSubmit(data);
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Inputs activeStep={activeStep} />
      <Paper elevation={3} classes={classes}>
        <ActiveComponent onSubmit={submit} />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
