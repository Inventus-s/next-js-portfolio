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
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative bg-black-100 flex justify-center items-center flex-col mx-auto px-4 sm:px-6 lg:px-8 overflow-clip min-h-screen"
        >
            <div className="w-full max-w-[100vw] sm:max-w-7xl py-8 sm:py-12 lg:py-16">
                {/* Hero Section */}
                <motion.section
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-8 sm:mb-10 lg:mb-12"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
                    >
                        Discover Movies
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 sm:mt-3 lg:mt-4 max-w-[90vw] sm:max-w-md mx-auto"
                    >
                        Explore a curated selection of movies across genres. Find your next favorite film!
                    </motion.p>
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(255,255,255,0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-3 sm:mt-4 lg:mt-6 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm md:text-base animate-btn min-w-[120px]"
                    >
                        Start Watching
                    </motion.button>
                </motion.section>

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-10 lg:mb-12">
                    {genres.map(genre => (
                        <motion.button
                            key={genre}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedGenre(genre)}
                            className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg text-xs sm:text-sm md:text-base transition-all duration-200 ${selectedGenre === genre
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                                } min-w-[60px]`}
                        >
                            {genre}
                        </motion.button>
                    ))}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-1.5 sm:p-2 bg-secondary rounded-lg"
                    >
                        <FiFilter size={16} className="text-secondary-foreground sm:w-5 sm:h-5" />
                    </motion.div>
                </div>

                {/* Movie Grid */}
                <motion.section
                    ref={gridRef}
                    variants={gridVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
                >
                    {filteredMovies.map(movie => (
                        <motion.div
                            key={movie.id}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0px 6px 15px rgba(255,255,255,0.1)",
                                transition: { duration: 0.2 },
                            }}
                            onClick={() => setSelectedMovie(movie)}
                            className="bg-card rounded-lg overflow-hidden cursor-pointer"
                        >
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-40 sm:h-48 lg:h-60 object-cover"
                            />
                            <div className="p-3 sm:p-4">
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold truncate">{movie.title}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">{movie.genre}</p>
                                <span className="mt-1 sm:mt-2 inline-block text-primary hover:underline text-xs sm:text-sm animate-slide-up">
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
                    className="fixed inset-0 bg-black-100/90 backdrop-blur-sm flex justify-center items-center z-50 px-2 sm:px-4 overflow-y-auto"
                    onClick={() => setSelectedMovie(null)}
                >
                    <motion.div
                        className="relative bg-card rounded-lg p-3 sm:p-4 md:p-6 w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-3xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedMovie(null)}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-foreground"
                            aria-label="Close video modal"
                        >
                            <FiX size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </motion.button>
                        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 truncate">{selectedMovie.title}</h2>
                        <div className="relative w-full" style={{ paddingTop: "56.25%" /* 16:9 Aspect Ratio */ }}>
                            <iframe
                                src={selectedMovie.videoUrl}
                                title={selectedMovie.title}
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.main>
    );
}