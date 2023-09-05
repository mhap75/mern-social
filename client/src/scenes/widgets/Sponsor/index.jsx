import { FlexBetween, WidgetWrapper } from "@/components/";
import { Link, Typography, useTheme } from "@mui/material";
import { serverUrl } from "@/const/index.js";

function SponsorAd() {
  const {
    palette: {
      neutral: { dark, main, medium },
    },
  } = useTheme();

  return (
    <WidgetWrapper marginBottom="2rem">
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>lookiAds</Typography>
      </FlexBetween>
      <Link href="https://something.com" target="_blank">
        <img
          width="100%"
          height="auto"
          alt="advert"
          src={`${serverUrl}/assets/info4.jpeg`}
          style={{ borderRadius: ".75rem", marginBlock: ".75rem" }}
        />
      </Link>
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Link href="https://something.com" target="_blank" color={medium}>
          something.com
        </Link>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
}

export default SponsorAd;
