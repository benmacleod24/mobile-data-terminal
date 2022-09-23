import {
	Button,
	Flex,
	Input,
	InputGroup,
	Text,
	Image,
	InputRightAddon,
	InputRightElement,
} from '@chakra-ui/react';
import * as React from 'react';
import { Formik, Form } from 'formik';
import { signIn, signOut, useSession } from 'next-auth/react';
import { HiEyeOff, HiEye } from 'react-icons/hi';

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = ({}) => {
	const [passwordVisible, setPasswordVisible] =
		React.useState<boolean>(false);
	const { status } = useSession();

	return (
		<Flex>
			<Flex
				w='xs'
				bg='brand.700'
				rounded={'md'}
				border='1px solid #30363d'
				mx='auto'
				mt='40'
				flexDir='column'
				p='7'
			>
				<Flex flexDir={'column'} mx='auto' textAlign={'center'} py='1'>
					<Image
						src='https://i.imgur.com/AHFKtEZ.png'
						w='20'
						mx='auto'
						mb='4'
						maxH='20'
					/>
					<Text textAlign={'center'} fontWeight='medium'>
						Mobile Data Terminal
					</Text>
					<Text opacity={0.9}>Login Portal</Text>
				</Flex>
				<Formik
					initialValues={{
						username: '',
						password: '',
					}}
					onSubmit={(values) => {
						signIn('credentials', {
							username: values.username,
							password: values.password,
						});
					}}
				>
					{(props) => {
						return (
							<Flex
								as={Form}
								flexDir='column'
								gap={5}
								name='mdt-login'
								mt='5'
							>
								<InputGroup variant={'outline'}>
									<Input
										placeholder='Username'
										name='username'
										_focusVisible={{ outline: 'none' }}
										type='text'
										value={props.values.username}
										onChange={(e) =>
											props.setFieldValue(
												'username',
												e.target.value
											)
										}
									/>
								</InputGroup>
								<InputGroup variant={'outline'}>
									<Input
										placeholder='Password'
										_focusVisible={{ outline: 'none' }}
										type={
											passwordVisible
												? 'text'
												: 'password'
										}
										name='password'
										value={props.values.password}
										onChange={(e) =>
											props.setFieldValue(
												'password',
												e.target.value
											)
										}
									/>
									<InputRightElement
										onClick={() =>
											setPasswordVisible((old) => !old)
										}
										children={
											passwordVisible ? (
												<HiEye />
											) : (
												<HiEyeOff />
											)
										}
									/>
								</InputGroup>
								<Button
									type='submit'
									bg='#0284C7'
									isLoading={props.isSubmitting}
									_hover={{
										bg: '#0EA5E9',
									}}
									_focus={{
										bg: '#0369A1',
									}}
									border={'1px solid #38BDF8'}
								>
									Login
								</Button>
								<Button
									onClick={() => signOut()}
									variant='link'
									fontWeight={'normal'}
									color='whiteAlpha.400'
								>
									Logout
								</Button>
							</Flex>
						);
					}}
				</Formik>
			</Flex>
		</Flex>
	);
};

export default Login;
