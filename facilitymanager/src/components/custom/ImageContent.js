import React from "react";
import Container from "@mui/material/Container";
import {ImageList, ImageListItem} from "@mui/material";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66',
        title: 'Title1',
        rows: 4,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb',
        title: 'Title2',
    },
    {
        img: 'https://images.unsplash.com/photo-1577394732330-38cef75bc388?',
        title: 'Title3',
    },
    {
        img: 'https://images.unsplash.com/photo-1601342630314-8427c38bf5e6',
        title: 'Title4',
        cols: 2,
        rows: 3
    },
    {
        img: 'https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb',
        title: 'Title5',
    },
    {
        img: 'https://images.unsplash.com/photo-1577394732330-38cef75bc388?',
        title: 'Title6',
    },
    {
        img: 'https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb',
        title: 'Title7',
    },
    {
        img: 'https://images.unsplash.com/photo-1577394732330-38cef75bc388?',
        title: 'Title8',
    },
];

function ImageContent() {
    return (
        <form className="form">
            <Container aria-expanded={"false"} sx={{width: '100%'}}>
                <ImageList
                    variant="quilted"
                    cols={4}
                    rowHeight={121}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.title} cols={item.cols || 1} rows={item.rows || 1}>
                            <img
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>
        </form>
    )
}


export default ImageContent
