import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { logIn, signUp } from '../../libs/auth';
import { sweetMixinErrorAlert } from '../../libs/sweetAlert';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutFull from '@/libs/components/layout/LayoutFull';
import { useTranslation } from 'next-i18next';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Join: NextPage = () => {
	const router = useRouter();
	const { t } = useTranslation('common');
	const device = useDeviceDetect();
	const [input, setInput] = useState({ nick: '', password: '', phone: '', type: 'USER' });
	const [loginView, setLoginView] = useState<boolean>(true);

	/** HANDLERS **/
	const viewChangeHandler = (state: boolean) => {
		setLoginView(state);
	};

	const checkUserTypeHandler = (e: any) => {
		const checked = e.target.checked;
		if (checked) {
			const value = e.target.name;
			handleInput('type', value);
		} else {
			handleInput('type', 'USER');
		}
	};

	const handleInput = useCallback((name: any, value: any) => {
		setInput((prev) => {
			return { ...prev, [name]: value };
		});
	}, []);

	const doLogin = useCallback(async () => {
		if (!input.nick.trim() || !input.password.trim()) {
			await sweetMixinErrorAlert(t('Please fulfill all inputs!'));
			return;
		}

		try {
			await logIn(input.nick.trim(), input.password);
			await router.push(`${router.query.referrer ?? '/'}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [input, router, t]);

	const doSignUp = useCallback(async () => {
		if (!input.nick.trim() || !input.password.trim() || !input.phone.trim() || !input.type.trim()) {
			await sweetMixinErrorAlert(t('Please fulfill all inputs!'));
			return;
		}

		try {
			await signUp(input.nick.trim(), input.password, input.phone.trim(), input.type);
			await router.push(`${router.query.referrer ?? '/'}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [input, router, t]);

	if (device === 'mobile') {
		return <div>{t('LOGIN MOBILE')}</div>;
	} else {
		return (
			<Stack className={'join-page'}>
				<Stack className={'container'}>
					<Stack className={'main'}>
						<Stack className={'left'}>
							<Box className={'info'}>
								<span>{loginView ? t('Log in') : t('Sign up')}</span>
							</Box>
							<Box className={'input-wrap'}>
								<div className={'input-box'}>
									<span>{t('Nickname')}</span>
									<input
										type="text"
										placeholder={t('Enter Nickname')}
										onChange={(e) => handleInput('nick', e.target.value)}
										required={true}
										onKeyDown={(event) => {
											if (event.key == 'Enter' && loginView) doLogin();
											if (event.key == 'Enter' && !loginView) doSignUp();
										}}
									/>
								</div>
								<div className={'input-box'}>
										<span>{t('Password')}</span>
										<input
											type="password"
											placeholder={t('Enter Password')}
										onChange={(e) => handleInput('password', e.target.value)}
										required={true}
										onKeyDown={(event) => {
											if (event.key == 'Enter' && loginView) doLogin();
											if (event.key == 'Enter' && !loginView) doSignUp();
										}}
									/>
								</div>
								{!loginView && (
									<div className={'input-box required'}>
										<span>{t('Phone')}</span>
										<input
											type="text"
											placeholder={t('Enter Phone')}
											onChange={(e) => handleInput('phone', e.target.value)}
											required={true}
											onKeyDown={(event) => {
												if (event.key == 'Enter') doSignUp();
											}}
										/>
									</div>
								)}
							</Box>
							<Box className={'register'}>
								{!loginView && (
									<div className={'type-option'}>
										<span className={'text'}>{t('I want to be registered as:')}</span>
										<div>
											<FormGroup>
												<FormControlLabel
													control={
														<Checkbox
															size="small"
															name={'USER'}
															onChange={checkUserTypeHandler}
															checked={input?.type == 'USER'}
														/>
													}
													label={t('User')}
												/>
											</FormGroup>
											<FormGroup>
												<FormControlLabel
													control={
														<Checkbox
															size="small"
															name={'AGENT'}
															onChange={checkUserTypeHandler}
															checked={input?.type == 'AGENT'}
														/>
													}
													label={t('Agent')}
												/>
											</FormGroup>
										</div>
									</div>
								)}

								{loginView && (
									<div className={'remember-info'}>
										<FormGroup>
											<FormControlLabel control={<Checkbox defaultChecked size="small" />} label={t('Remember me')} />
										</FormGroup>
										<a>{t('Lost your password?')}</a>
									</div>
								)}

								{loginView ? (
									<Button
										variant="contained"
										disabled={input.nick == '' || input.password == ''}
										onClick={doLogin}
										style={{cursor:"pointer"}}
									>
										{t('Login')}
									</Button>
								) : (
									<Button
										variant="contained"
										disabled={input.nick == '' || input.password == '' || input.phone == '' || input.type == ''}
										onClick={doSignUp}
										style={{cursor:"pointer"}}
									>
										{t('Signup')}
									</Button>
								)}
							</Box>
							<Box className={'ask-info'}>
								{loginView ? (
									<p>
										{t("Don't have an account?")} 
										<a style={{color:"#3865eb", cursor:'pointer', textDecoration:'underline'}}
											onClick={() => {
												viewChangeHandler(false);
											}}
										> {t('Sign up')}
										</a>
									</p>
								) : (
									<p>
										{t('Already have an account?')}
										<a style={{color:"#3865eb", cursor:'pointer', textDecoration:'underline'}} onClick={() => viewChangeHandler(true)}> {t('Log in')}</a>
									</p>
								)}
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutFull(Join);
