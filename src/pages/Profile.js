import {Link, useParams} from "react-router-dom";
import {Fragment, useContext, useEffect} from "react";
import {GithubContext} from "../context/github/githubContext";
import {Repos} from "../components/Repos/Repos";

export const Profile = () => {
    const params = useParams();
    console.log(params);
    const githubContext = useContext(GithubContext);
    useEffect(() => {
        githubContext.getUser(params.name);
        githubContext.getRepos(params.name);
        console.log('effect');
    }, []);

    if (githubContext.state.loading) {
        return <p className="text-center">Загрузка...</p>
    }

    const user = githubContext.state.user;
    return (
        <Fragment>
            <Link to="/" className="btn btn-primary">На главную</Link>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <img src={user.avatar_url} alt={user.name} style={{width: '150px'}}/>
                            <h1>{user.name}</h1>
                            {
                                user.location && <p>Местоположение: {user.location}</p>
                            }
                        </div>
                        <div className="col">
                            {
                                user.bio &&
                                <Fragment>
                                    <h3>BIO</h3>
                                    <p>{user.bio}</p>
                                </Fragment>
                            }
                            <a href={user.html_url} target="_blank" rel="noreferrer noopener" className="btn btn-dark">
                                Открыть профиль
                            </a>
                            <ul>
                                {
                                    user.login &&
                                    <li>
                                        <strong>Username: </strong>
                                        {user.login}
                                    </li>
                                }
                                {
                                    user.company &&
                                    <li>
                                        <strong>Компания: </strong>
                                        {user.company}
                                    </li>
                                }
                                {
                                    user.blog &&
                                    <li>
                                        <strong>Website: </strong>
                                        {user.blog}
                                    </li>
                                }
                            </ul>
                            <div className="badge text-bg-primary">Подписчики: {user.followers}</div>
                            <div className="badge text-bg-success">Подписан: {user.following}</div>
                            <div className="badge text-bg-info">Репозитории: {user.public_repos}</div>
                            <div className="badge text-bg-dark">Gists: {user.public_gists}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Repos repos={githubContext.state.repos}/>
        </Fragment>
    );
};