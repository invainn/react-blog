import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        }); 
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            // onSubmit is called after handleSubmit says it's validated
            // we bind onSubmit because it will be called in a different context (in handleSubmit)
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="Title" 
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="Categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="Content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    // Validate inputs from 'values' obj
    if(!values.Title || values.Title.length < 3) {
        errors.Title = "Enter a title that is at least 3 characters.";
    }

    if(!values.Categories) {
        errors.Categories = "Enter some categories!";
    }

    if(!values.Content) {
        errors.Content = "Enter some content!";
    }
    
    // If empty, then it's good to submit
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);