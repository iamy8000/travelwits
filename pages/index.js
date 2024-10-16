import React, { useState } from 'react';
import {
	Container,
	Grid,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Box,
	Typography,
	Checkbox,
	ListItemText,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const genres = {
	action: 'Action',
	comedy: 'Comedy',
	thriller: 'Thriller',
	drama: 'Drama',
};

const movies = [
	{
		title: 'The Matrix',
		rating: 7.5,
		genre: genres.action,
	},
	{
		title: 'Focus',
		rating: 6.9,
		genre: genres.comedy,
	},
	{
		title: 'The Lazarus Effect',
		rating: 6.4,
		genre: genres.thriller,
	},
	{
		title: 'Everly',
		rating: 5.0,
		genre: genres.action,
	},
	{
		title: 'Maps to the Stars',
		rating: 7.5,
		genre: genres.drama,
	},
];

const highlightSearchString = (text, searchString) => {
	if (!searchString) return text;

	const parts = text.split(new RegExp(`(${searchString})`, 'gi'));
	return parts.map((part, index) =>
		part.toLowerCase() === searchString.toLowerCase() ? (
			<strong key={index}>{part}</strong>
		) : (
			part
		)
	);
};

const SearchBar = ({ search, onSearchChange, filteredMovies }) => (
	<>
		<TextField
			variant="outlined"
			fullWidth
			placeholder="Enter movie name"
			onChange={onSearchChange}
		/>
		{filteredMovies.length !== 0 && (
			<Box
				sx={{
					borderWidth: '1pt',
					borderColor: '#979797',
					padding: '12pt',
					marginTop: '4pt',
					paddingBottom: '6pt',
				}}
			>
				{filteredMovies.map((movie) => (
					<Grid container key={movie.title} marginBottom="12pt">
						<Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center" paddingLeft="2pt">
							<Typography variant="body1">{highlightSearchString(movie.title, search)}</Typography>
							<Typography variant="body1" color="#777777">
								{movie.genre}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							{[...Array(Math.floor(movie.rating))].map((_, i) => (
								<StarIcon key={i} />
							))}
							{movie.rating % 1 !== 0 && <StarHalfIcon />}
							{[...Array(10 - Math.ceil(movie.rating))].map((_, i) => (
								<StarBorderIcon key={i} />
							))}
						</Grid>
					</Grid>
				))}
			</Box>
		)}
	</>
);

const RatingFilter = ({ ratings, onRatingChange }) => (
	<FormControl fullWidth>
		<InputLabel>Rating</InputLabel>
		<Select
			multiple
			value={ratings}
			onChange={onRatingChange}
			renderValue={(selected) => selected.join(', ')}
		>
			<MenuItem value="">
				<Checkbox checked={ratings.length === 0} />
				<ListItemText primary="Any rating" />
			</MenuItem>
			{Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => (
				<MenuItem key={rating} value={rating.toString()}>
					<Checkbox checked={ratings.indexOf(rating.toString()) > -1} />
					<Box display="flex" alignItems="center">
						{Array.from({ length: rating }, (_, i) => (
							<StarIcon key={i} />
						))}
						{Array.from({ length: 10 - rating }, (_, i) => (
							<StarBorderIcon key={i} />
						))}
					</Box>
				</MenuItem>
			))}
		</Select>
	</FormControl>
);

const GenreFilter = ({ selectedGenres, onGenreChange }) => (
	<FormControl fullWidth>
		<InputLabel>Genre</InputLabel>
		<Select
			multiple
			value={selectedGenres}
			onChange={onGenreChange}
			renderValue={(selected) => selected.join(', ')}
		>
			<MenuItem value="Any genre">
				<Checkbox checked={selectedGenres.length === 0} />
				<ListItemText primary="Any genre" />
			</MenuItem>
			{Object.values(genres).map((genre) => (
				<MenuItem key={genre} value={genre}>
					<Checkbox checked={selectedGenres.indexOf(genre) > -1} />
					<ListItemText primary={genre} />
				</MenuItem>
			))}
		</Select>
	</FormControl>
);

const Home = () => {
	const [search, setSearch] = useState('');
	const [ratings, setRatings] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);

	const handleSearchChange = (e) => setSearch(e.target.value);
	const handleRatingChange = (e) => setRatings(e.target.value);
	const handleGenreChange = (e) => {
		const value = e.target.value;
		if (value.includes('Any genre')) {
			setSelectedGenres([]);
		} else {
			setSelectedGenres(value);
		}
	};

	const filteredMovies = search
		? movies.filter((movie) => {
			const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
			const matchesRating = ratings.length === 0 || ratings.includes(Math.floor(movie.rating).toString());
			const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
			return matchesSearch && matchesRating && matchesGenre;
		})
		: [];

	return (
		<Container maxWidth="lg" sx={{ padding: '22pt' }}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					Hello this is yating's web!!!
				</Grid>
				<Grid item xs={12} md={8}>
					<SearchBar search={search} onSearchChange={handleSearchChange} filteredMovies={filteredMovies} />
				</Grid>
				<Grid item xs={12} md={2}>
					<RatingFilter ratings={ratings} onRatingChange={handleRatingChange} />
				</Grid>
				<Grid item xs={12} md={2}>
					<GenreFilter selectedGenres={selectedGenres} onGenreChange={handleGenreChange} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
