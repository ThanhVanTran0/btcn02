import React from 'react';
import { Col } from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles';
import '../styles/List.css'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({

});

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            IMAGES: [],
            maxPage: null,
            page: 1,
            selectedId: null
        }
        this.handleScroll = this.handleScroll.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
    }

    async componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)

        try {
            let source = await fetch('https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=71bb3dc2fc4e572f5613d03922bf5d44&extras=owner_name%2C+views%2Curl_n&per_page=20&page=1&format=json&nojsoncallback=1')
            let photos = (await source.json()).photos;
            console.log(photos);
            this.setState({
                IMAGES: photos.photo,
                maxPage: photos.pages,
                page: this.state.page + 1
            })
        } catch (error) {
            alert('ERROR: ' + error.message)
        }

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.loadMore();
        }
    }

    async loadMore() {
        if (this.state.page > this.state.maxPage) return;
        try {
            let source = await fetch(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=71bb3dc2fc4e572f5613d03922bf5d44&extras=owner_name%2C+views%2Curl_n&per_page=20&page=${this.state.page}&format=json&nojsoncallback=1`)
            let photos = (await source.json()).photos;
            this.setState({
                IMAGES: this.state.IMAGES.concat(photos.photo),
                page: this.state.page + 1
            })
        } catch (error) {
            alert('ERROR: ' + error.message)
        }
    }

    onMouseEnter(id) {
        console.log(id);
        this.setState({
            selectedId: id
        })
    }

    onMouseLeave() {
        this.setState({
            selectedId: null
        })
    }

    render() {
        let { classes } = this.props
        return (
            <div>
                <Col mdPush={1} xs={12} md={10}>
                    <GridList cellHeight={300} cols={3}>
                        {this.state.IMAGES.map(item => (
                            <GridListTile onMouseLeave={() => this.onMouseLeave()} onMouseEnter={() => this.onMouseEnter(item.id)} key={item.id}>
                                <img src={item.url_n} alt={item.title} />
                                {
                                    item.id === this.state.selectedId && <GridListTileBar
                                        title={<h4>{item.title}</h4>}
                                        subtitle={<span style={{ fontSize: 16 }}>By: {item.ownername} <br /> Views: item.views</span>}
                                    /> }
                            </GridListTile>
                        ))}
                    </GridList>
                </Col>
            </div>
        );
    }
}

export default withStyles(styles)(List)
