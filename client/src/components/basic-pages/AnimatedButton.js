import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const AnimatedButton = () => {
  const history = useHistory();

  return (
    <div>
      <Button animated onClick={() => history.push("/map")}>
        <Button.Content visible>SEARCH</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
    </div>
  );
};

export default AnimatedButton;
