import React from 'react';
import { CssBaseline, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/dm-sans';
import '../styles/globals.css';

const theme = createTheme({
	typography: {
		fontFamily: 'DM Sans, sans-serif',
		body1: {
			fontSize: '14px',
			fontWeight: 500,
			lineHeight: '24px',
			letterSpacing: '-0.2px',
			textAlign: 'left',
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: '#979797',
					borderRadius: 0,
				},
				root: {
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: 'black',
					},
				},
			},
		},
		MuiSelect: {
			defaultProps: {
				MenuProps: {
					PaperProps: {
						component: Paper,
						elevation: 0,
						style: {
							marginTop: "8pt",
							borderColor: "black",
							borderWidth: "1pt",
							borderRadius: 0,
						},
					},
				},
			},
		}
	},
});

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
