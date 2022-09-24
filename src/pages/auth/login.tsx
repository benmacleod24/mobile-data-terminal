import {
	Button,
	Flex,
	Input,
	InputGroup,
	Text,
	Image,
	InputRightAddon,
	InputRightElement,
	Divider,
	Alert,
	AlertDescription,
	AlertIcon,
} from '@chakra-ui/react';
import * as React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { signIn, signOut, useSession } from 'next-auth/react';
import { HiEyeOff, HiEye } from 'react-icons/hi';
import { BsDiscord } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';

const initalLoginValue = {
	username: '',
	password: '',
};

type TFormValues = typeof initalLoginValue;
interface LoginProps {}

/**
 * @desc Login page to handle logging in.
 * @todo Breakout custom input component.
 * @todo Make a formik wrapper maybe?
 */
const Login: React.FunctionComponent<LoginProps> = ({}) => {
	const [passwordVisible, setPasswordVisible] =
		React.useState<boolean>(false);
	const { status } = useSession();
	const { push, query } = useRouter();

	/**
	 * Handle submission of the login form.
	 * @param values Values of the form.
	 * @param helpers Formik helpers.
	 */
	const onSubmit = async (
		loginType: 'credentials' | 'discord' = 'credentials',
		values: TFormValues,
		helpers: FormikHelpers<TFormValues>
	) => {
		const { password, username } = values;

		/**
		 * Disable redirect so we can handle error right in the form.
		 */
		const response = await signIn(loginType, {
			redirect: false,
			callbackUrl: '/',
			username: username ?? '',
			password: password ?? '',
		});

		// If there is an error we want to add it to the error object.
		if (response && response.error) {
			helpers.setErrors({
				username: response.error,
			});
		}

		// Login successfully? Redirect to homepage.
		if (response && response.ok && !response.error) {
			return push('/');
		}
	};

	return (
		<Flex>
			<Flex
				w='sm'
				bg='brand.700'
				rounded={'md'}
				border='1px solid #30363d'
				mx='auto'
				mt={['40', '40', '40', '20']}
				flexDir='column'
				p='7'
				transition={'0.25s ease-in-out'}
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
					initialValues={initalLoginValue}
					onSubmit={(values, helpers) =>
						onSubmit('credentials', values, helpers)
					}
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
								{((props.errors && props.errors.username) ||
									query.error) && (
									<Alert
										status='error'
										rounded={'md'}
										py='2'
										border={'1px solid'}
										borderColor='red.300'
									>
										<AlertIcon fontSize={'sm'} />
										<AlertDescription
											fontSize={'sm'}
											lineHeight='4'
										>
											{props.errors.username ||
												query.error}
										</AlertDescription>
									</Alert>
								)}
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
								<Flex flexDir={'column'} gap={3}>
									<Button
										type='submit'
										variant={'brand.blue'}
										isLoading={props.isSubmitting}
									>
										Login
									</Button>
									<Flex align={'center'}>
										<Divider />
										<Text mx='4' color='whiteAlpha.400'>
											Or
										</Text>
										<Divider />
									</Flex>
									<Button
										bg='#7289da'
										isLoading={props.isSubmitting}
										_hover={{
											bg: '#8699df',
										}}
										_focus={{
											bg: '#5e77d4',
										}}
										leftIcon={<BsDiscord />}
										border={'1px solid #9aaae4'}
										onClick={() =>
											//@ts-ignore
											onSubmit('discord', {}, {})
										}
									>
										Login with Discord
									</Button>
								</Flex>
								<Flex mx='auto' color='whiteAlpha.400' gap={2}>
									<Link href={'/'}>
										<Button
											variant='link'
											size={'xs'}
											fontWeight={'normal'}
											color='whiteAlpha.400'
										>
											Home
										</Button>
									</Link>
									&#x2022;
									<Link href={'/help'}>
										<Button
											onClick={() => signOut()}
											variant='link'
											size={'xs'}
											fontWeight={'normal'}
											color='whiteAlpha.400'
										>
											Help
										</Button>
									</Link>
								</Flex>
							</Flex>
						);
					}}
				</Formik>
			</Flex>
		</Flex>
	);
};

export default Login;
