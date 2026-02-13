import ModalContainer from "./ModalContainer";
import { Typography } from "@mui/material";

export const LoadingMessage = ({ message = "Loading..." }) => {
    return (
        <ModalContainer>
            <Typography align="center">
                {message}
            </Typography>
        </ModalContainer>
    )
}
