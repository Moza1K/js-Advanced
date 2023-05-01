const container = document.createElement(`div`);
const postsRequest = new XMLHttpRequest();
postsRequest.open(`GET`, `https://jsonplaceholder.typicode.com/posts`);
postsRequest.responseType = `json`;

postsRequest.send()

const hideComments = (div) => {
    let comments = div.lastElementChild;
    comments.remove();

}

const showComments = (comments, div) => {
    const divComment = document.createElement(`div`)

    comments.forEach((obj) => {
        let{body: comment} = obj

        const p = document.createElement(`p`)
        p.innerText = comment

        divComment.append(p)
        div.append(divComment)
    });

    // div.append(divComment)

}

const getPostComment = (id, event) => {
    const xhrComments = new XMLHttpRequest()
    xhrComments.open(`GET`, `https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    xhrComments.responseType = `json`
    xhrComments.send()

    const button = event.target;
    const parent = event.target.parentNode;

    xhrComments.onload = () => {

        let result = xhrComments.response

        if(button.innerText === `Show comments`){
            button.innerText = `Hide comments`
            showComments(result, parent)
        }else if(button.innerText === `Hide comments`){
            button.innerText = `Show comments`
            hideComments(parent)
        }
    }

}

const renderPost = (postsList, cont) => {
    const posts = postsList.map((post) => {
        const postCont = document.createElement(`div`);
        const postTitle = document.createElement(`h2`);
        const postText = document.createElement(`p`);
        const button = document.createElement(`button`);

        postTitle.innerText = post.title;
        postText.innerText = post.body;
        button.innerText = `Show comments`;
        postCont.classList.add(`post-container`);
        button.classList.add(`button`);

        postCont.append(postTitle, postText, button);
        let postsId = post.id;

        button.addEventListener(`click`, (event) => {
            getPostComment(postsId, event);
        })
        console.log(postCont)
        document.body.append(postCont)
    })
    
    cont.append(...posts)
    document.body.append()
}

postsRequest.onload = () => {
    const {response} = postsRequest
    renderPost(response, container)
}

