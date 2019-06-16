import React, { Component } from 'react';

import './Feed.css';
import api from '../services/api';
import io from 'socket.io-client';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component {

    /* Variavel dentro do component para armazenar informações. */
    /* Também serve para atualizar as informações do component quando essa variavel é alterada */
    state = {
        feed: [],

    };



    /* Método chamado quando o component é construido */
    async componentDidMount() {
        this.registerToSocket();

        /* Chamada das postagens constantes no BD */
        const response = await api.get('posts');
        /* Atribui na variavel feed do state a resposta do servidor. Consequentemente as
        informações serão trazidas na tela */
        this.setState({ feed: response.data });

    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] })
        });
        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post =>
                    post._id === likedPost._id ? likedPost : post
                )
            })
        });
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    };
    render() {
        return (
            <section id="post-list">
                {/* Abertuda de chaves para executar o JS dentro do html (section) */}
                {/* Acessando o array feed do state e perdorrendo cada post */}
                {/* Conforme acessa o post, vai criando o html (article)*/}
                {/*Cada article é um post do usuário  */}
                {/* É necessário adicionar um key no primeiro item após o map */}
                {this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>
                            <img src={more} alt="Mais" />
                        </header>
                        <img src={`http://localhost:3333/files/${post.image}`} alt='' />
                        <footer>
                            <div className="actions">
                                <button type="button" onClick={() => this.handleLike(post._id)}>
                                    <img src={like} alt='' />
                                </button>
                                <img src={comment} alt='' />
                                <img src={send} alt='' />
                            </div>
                            <strong>{post.likes} curtidas</strong>
                            <p>{post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>
                    </article>
                ))
                }


            </section>
        );
    }
}

export default Feed;
