import React from 'react';

class Searchbar extends React.Component { 
    state = {
        imagesName: '',
    };

    handleNameChange = e => {
        this.setState({imagesName: e.currentTarget.value.toLowerCase()});
    };
    
    handleSubmit = e => {
        e.preventDefault();

        if (this.state.imagesName.trim() === '') {
            alert('введите имя изображения');
            return;
        }

        this.props.onSubmit(this.state.imagesName);
        this.setState({imagesName: ''});
    }


    render() {
        return (
            <header onSubmit={this.handleSubmit}> {/*className={s.searchbar}*/}
                <form> {/* className={s.form} */}
                    <button type="submit"> {/*className={s.button}*/}
                        <span>Search</span> {/*className={s.button-label}*/}
                    </button>

                    <input
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                        onChange={this.handleNameChange}
                        value={this.state.imagesName}
                    /> {/*className={s.input}*/}
                </form>
            </header>
        );
    };
};

export default Searchbar;
