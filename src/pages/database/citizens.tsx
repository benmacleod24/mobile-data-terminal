import { getCitziens } from '@/frontend/api/citizens';
import CitizenCard from '@/frontend/components/Databases/CItizens/CitizenCard';
import Dropdown from '@/frontend/components/Dropdown';
import Layout from '@/frontend/components/layout';
import {
	Button,
	Flex,
	Grid,
	Image,
	Input,
	InputGroup,
	MenuItem,
	Text,
	Wrap,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { BsBook, BsPerson, BsSearch } from 'react-icons/bs';

interface CitizensProps {}

const Citizens: React.FunctionComponent<CitizensProps> = () => {
	const { status, data: session } = useSession();
	const [page, setPage] = React.useState(0);
	const { data, isLoading } = useQuery(['citizens'], getCitziens);

	return (
		<Layout>
			<Flex flexDir={'column'} w='full'>
				<Flex as={'header'}>
					<Formik
						initialValues={{
							id: '',
							first_name: '',
							last_name: '',
						}}
						onSubmit={() => {}}
					>
						{(props) => {
							const { values, setFieldValue: setValue } = props;

							return (
								<Flex as={Form} w='full' gap={3} my='4'>
									<InputGroup w='full'>
										<Input
											bg='whiteAlpha.50'
											placeholder='ID'
											value={values.id}
											_focusVisible={{ outline: 'none' }}
											onChange={(e) =>
												setValue('id', e.target.value)
											}
										/>
									</InputGroup>
									<InputGroup w='full'>
										<Input
											bg='whiteAlpha.50'
											placeholder='First Name'
											value={values.first_name}
											_focusVisible={{ outline: 'none' }}
											onChange={(e) =>
												setValue(
													'first_name',
													e.target.value
												)
											}
										/>
									</InputGroup>
									<InputGroup w='full'>
										<Input
											bg='whiteAlpha.50'
											placeholder='Last Name'
											value={values.last_name}
											_focusVisible={{ outline: 'none' }}
											onChange={(e) =>
												setValue(
													'last_name',
													e.target.value
												)
											}
										/>
									</InputGroup>
									<Button
										leftIcon={<BsSearch />}
										minW='32'
										variant={'brand.blue'}
									>
										Search
									</Button>
								</Flex>
							);
						}}
					</Formik>
				</Flex>
				<Grid
					as={'main'}
					flexDir='column'
					w='full'
					gap={3}
					templateColumns='repeat(2, 1fr)'
				>
					{data &&
						data.data.citizens.map((citizen) => (
							<CitizenCard key={citizen.id} citizen={citizen} />
						))}
				</Grid>
				<Flex as={'footer'}>Footer</Flex>
			</Flex>
		</Layout>
	);
};

export default Citizens;
