'use client';
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

export default function MoviesPage() {
    // Placeholder movie data with video URLs (replace with API data if needed)
    const movies = [
        { id: 1, title: "Demon.Slayer.Kimetsu.No.Yaiba.Infinity.Castle.2025.1080p.HDTC.Hindi.LiNE-Japanese.ESub.x264-HDHub4u.Ms.mkv", genre: "Action", poster: "/placeholder.jpg", videoUrl: "https://short.icu/Mxsx3HYcA" },
        // { id: 2, title: "Movie Two", genre: "Drama", poster: "/placeholder.jpg", videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0" },
        // { id: 3, title: "Movie Three", genre: "Comedy", poster: "/placeholder.jpg", videoUrl: "https://www.youtube.com/embed/3t6M5Z-7b4k" },
        // { id: 4, title: "Movie Four", genre: "Sci-Fi", poster: "/placeholder.jpg", videoUrl: "https://www.youtube.com/embed/6hB3S9bIaco" },
        // { id: 5, title: "Movie Five", genre: "Action", poster: "/placeholder.jpg", videoUrl: "https://www.youtube.com/embed/yXq3f0ELKJI" },
        // { id: 6, title: "Movie Six", genre: "Drama", poster: "/placeholder.jpg", videoUrl: "https://www.youtube.com/embed/1VnghdsjI_0" },
    ];

    const genres = ["All", "Action", "Drama", "Comedy", "Sci-Fi"];
    const [selectedGenre, setSelectedGenre] = useState("All");
    type Movie = { id: number; title: string; genre: string; poster: string; videoUrl: string; };
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    // Filter movies based on genre
    const filteredMovies = selectedGenre === "All"
        ? movies
        : movies.filter(movie => movie.genre === selectedGenre);

    // Animation variants for hero section
    const heroVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    // Scroll-triggered animation for movie grid
    const gridRef = useRef(null);
    const isInView = useInView(gridRef, { once: true, amount: 0.2 });

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    };

    // Modal animation variants
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip"
        >
            <div className="max-w-7xl w-full py-20">
                {/* Hero Section */}
                <motion.section
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-16"
                >
                    <motion.h1 variants={itemVariants} className="heading">
                        Discover Movies
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-muted-foreground mt-4 max-w-lg mx-auto">
                        Explore a curated selection of movies across genres. Find your next favorite film!
                    </motion.p>
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(255,255,255,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg animate-btn"
                    >
                        Start Watching
                    </motion.button>
                </motion.section>

                {/* Filter Bar */}
                <div className="flex justify-center gap-4 mb-12">
                    {genres.map(genre => (
                        <motion.button
                            key={genre}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedGenre(genre)}
                            className={`px-4 py-2 rounded-lg transition-all duration-300 ${selectedGenre === genre
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-accent"
                                }`}
                        >
                            {genre}
                        </motion.button>
                    ))}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-secondary rounded-lg"
                    >
                        <FiFilter size={24} className="text-secondary-foreground" />
                    </motion.div>
                </div>

                {/* Movie Grid */}
                <motion.section
                    ref={gridRef}
                    variants={gridVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredMovies.map(movie => (
                        <motion.div
                            key={movie.id}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 8px 20px rgba(255,255,255,0.1)",
                                transition: { duration: 0.3 },
                            }}
                            onClick={() => setSelectedMovie(movie)}
                            className="bg-card rounded-lg overflow-hidden cursor-pointer"
                        >
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{movie.title}</h3>
                                <p className="text-muted-foreground">{movie.genre}</p>
                                <span className="mt-2 inline-block text-primary hover:underline animate-slide-up">
                                    Watch Now
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.section>
            </div>

            {/* Video Modal */}
            {selectedMovie && (
                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 bg-black-100/80 backdrop-blur-md flex justify-center items-center z-50"
                    onClick={() => setSelectedMovie(null)} // Close on backdrop click
                >
                    <motion.div
                        className="relative bg-card rounded-lg p-6 w-full max-w-3xl"
                        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedMovie(null)}
                            className="absolute top-4 right-4 text-foreground"
                            aria-label="Close video modal"
                        >
                            <FiX size={24} />
                        </motion.button>
                        <h2 className="text-2xl font-semibold mb-4">{selectedMovie.title}</h2>
                        <div className="relative w-full" style={{ paddingTop: "56.25%" /* 16:9 Aspect Ratio */ }}>
                            <iframe
                                src={selectedMovie.videoUrl}
                                title={selectedMovie.title}
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.main>
    );
}