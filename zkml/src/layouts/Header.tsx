import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../assets/img/logo.png";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        width: 1
      }}
    >
      <div className="flex justify-between w-full h-16 p-4 items-center">
        <img src={Logo} className="w-fit" />
        <ConnectButton />
      </div>
    </Box>
  );
};

export default Header;
