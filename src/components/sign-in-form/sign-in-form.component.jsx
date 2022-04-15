import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES} from '../button/button.component';

import  { SignInContainer, ButtonContainer } from'./sign-in-form.styles';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import { 
    
    signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: '',
}



const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());

        }
    

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('user not found with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    };
    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    name="password"
                    onChange={handleChange}
                    value={password} />
                    <ButtonContainer>
                <Button type="submit">
                    Sign In
                </Button >
                <Button 
                type='button'
                buttonType={BUTTON_TYPE_CLASSES.google}
                onClick={signInWithGoogle} >
                    Google Sign In
                </Button>
                    </ButtonContainer>
            </form>
        </SignInContainer>
    );
};


export default SignInForm;