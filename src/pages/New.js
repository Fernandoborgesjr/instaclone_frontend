import React, { Component } from 'react';
import api from '../services/api';


import './New.css';

class New extends Component {
    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    };

    /* Método para obter as informações digitadas no form */
    /* e: é o evento do html */
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    };

    handleSubmit = async e => {
        /*e.preventDefault: Para não dar refresh na pagina ao fazer o submit */
        e.preventDefault();

        const data = new FormData();
        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hastags', this.state.hashtags);

        api.post('posts', data);
        /* Para redirecionar para a rota inicial da aplicação */
        this.props.history.push('/');
    };
    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange} required={true} />
                <input type="text" name="author" placeholder="Autor do Post" onChange={this.handleChange} value={this.state.author} />
                <input type="text" name="place" placeholder="Local do Post" onChange={this.handleChange} value={this.state.place} />
                <input type="text" name="description" placeholder="Descrição do Post" onChange={this.handleChange} value={this.state.description} />
                <input type="text" name="hashtags" placeholder="Hashtags do Post" onChange={this.handleChange} value={this.state.hastags} />
                <button type="submit" >Postar</button>
            </form>
        );
    }
}

export default New;