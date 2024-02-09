import { FC, memo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Image } from "@/components/common/Image";
import { MovieModal } from "./MovieModal";
import { en } from "@/locales/en";

interface MovieCardProps {
  title: string;
  poster: string;
  movieId: string;
  publishingYear: number;
}

export const MovieCard: FC<MovieCardProps> = memo(
  ({ title, poster, publishingYear, movieId }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
      <>
        <Stack
          maxWidth={{ xs: 180, md: 282 }}
          height={{ xs: 320, md: 450 }}
          width="100%"
          bgcolor="background.dark"
          borderRadius="12px"
          sx={{ cursor: "pointer" }}
          onClick={() => setModalOpen(true)}
          pb={{ xs: 1.5, md: 1.5 }}
        >
          <Box
            m={{ xs: 0, md: 1 }}
            mb={{ xs: 1, md: 1 }}
            overflow="hidden"
            maxHeight={400}
            sx={{
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              borderBottomLeftRadius: { xs: 0, md: "12px" },
              borderBottomRightRadius: { xs: 0, md: "12px" },
            }}
          >
            <Image ratio="9/16" src={poster} alt={`${title}-movie`} />
          </Box>
          <Stack direction="column" px={{ xs: 1.5, md: 2 }}>
            <Typography variant="body-xl" mb={1}>
              {title}
            </Typography>
            <Typography variant="caption">{publishingYear}</Typography>
          </Stack>
        </Stack>
        <MovieModal
          isOpen={modalOpen}
          movieId={movieId}
          title={en.edit}
          handleClose={() => {
            setModalOpen(false);
          }}
        />
      </>
    );
  }
);
