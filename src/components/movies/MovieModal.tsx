import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FC, useEffect, useState } from "react";
import { CreateUpdateMovie } from ".";
import { IMovie } from "@/store/types/viewer/interfaces";
import { useLazyGetMovieByIdQuery } from "@/store/api/moviesApi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90vh",
  bgcolor: "#d8d7d7",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

interface MovieModalProps {
  isOpen: boolean;
  title?: string;
  movieId?: string;
  handleClose: () => void;
}

export const MovieModal: FC<MovieModalProps> = ({
  isOpen,
  title,
  handleClose,
  movieId,
}) => {
  const [currentMovie, setCurrentMovie] = useState<IMovie | null>(null);

  const [getMovieByIdQuery] = useLazyGetMovieByIdQuery();

  useEffect(() => {
    if (!movieId) return;

    getMovieByIdQuery({ movieId: movieId as string }).then((data) =>
      setCurrentMovie(data?.data?.movie || null)
    );
  }, [movieId]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h2" mb={{ xs: 1, md: 2 }}>
          {title}
        </Typography>
        <CreateUpdateMovie
          onCancel={handleClose}
          movie={currentMovie || undefined}
        />
      </Box>
    </Modal>
  );
};
