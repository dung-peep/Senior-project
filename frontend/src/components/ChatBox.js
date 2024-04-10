import { Avatar, Stack, SnackbarContent, Button } from "@mui/material";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";


const action = (
    <Button color="secondary" size="small">
      lorem ipsum dolorem
    </Button>
  );

export const Chat = () => {
    // return (
    //     <ChatBox>
    //         <ReceiverMessage avatar={<Avatar>KS</Avatar>}>
    //             Hello how are you?
    //         </ReceiverMessage>
    //         <SenderMessage avatar={<Avatar>NA</Avatar>}>
    //             I'm good thanks you?
    //         </SenderMessage>
    //         <ReceiverMessage avatar={<Avatar>KS</Avatar>}>
    //             I'm good too!
    //         </ReceiverMessage>
    //     </ChatBox>
    // )

    return (
        <Stack spacing={2} sx={{ maxWidth: 600 }}>
          <SnackbarContent message="I love snacks." action={action} />
          <SnackbarContent
            message={
              'I love candy. I love cookies. I love cupcakes. \
              I love cheesecake. I love chocolate.'
            }
          />
          <SnackbarContent
            message="I love candy. I love cookies. I love cupcakes."
            action={action}
          />
          <SnackbarContent
            message={
              'I love candy. I love cookies. I love cupcakes. \
              I love cheesecake. I love chocolate.'
            }
            action={action}
          />
        </Stack>
      );
}
