import React, { useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '@/libs/components/layout/LayoutAdmin';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  List,
  ListItem,
  OutlinedInput,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useMutation, useQuery } from '@apollo/client';
import { GET_NOTICES } from '@/apollo/user/query';
import {
  CREATE_NOTICE,
  REMOVE_NOTICE_BY_ADMIN,
  UPDATE_NOTICE_BY_ADMIN,
} from '@/apollo/admin/mutation';
import { NoticeCategory, NoticeStatus } from '@/libs/enums/notice.enum';
import { Direction } from '@/libs/enums/common.enum';
import { NoticesInquiry } from '@/libs/types/notice/notice.input';
import { Notice } from '@/libs/types/notice/notice';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '@/libs/sweetAlert';
import { useTranslation } from 'next-i18next';

const AdminNotice: NextPage = () => {
  const { t } = useTranslation('common');
  const [searchText, setSearchText] = useState('');
  const [tab, setTab] = useState<string>('ALL');
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [createForm, setCreateForm] = useState({ noticeTitle: '', noticeContent: '' });
  const [editForm, setEditForm] = useState({ _id: '', noticeTitle: '', noticeContent: '' });
  const [inquiry, setInquiry] = useState<NoticesInquiry>({
    page: 1,
    limit: 10,
    sort: 'createdAt',
    direction: Direction.DESC,
    search: { noticeCategory: NoticeCategory.NOTICE },
  });

  const { data, refetch } = useQuery(GET_NOTICES, {
    fetchPolicy: 'network-only',
    variables: { input: inquiry },
    notifyOnNetworkStatusChange: true,
  });
  const [createNotice] = useMutation(CREATE_NOTICE);
  const [updateNotice] = useMutation(UPDATE_NOTICE_BY_ADMIN);
  const [removeNotice] = useMutation(REMOVE_NOTICE_BY_ADMIN);

  const noticeList: Notice[] = data?.getNotices?.list ?? [];
  const total = data?.getNotices?.metaCounter?.[0]?.total ?? 0;

  const changePageHandler = async (event: unknown, newPage: number) => {
    const next = { ...inquiry, page: newPage + 1 };
    setInquiry(next);
    await refetch({ input: next });
  };

  const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...inquiry, limit: parseInt(event.target.value, 10), page: 1 };
    setInquiry(next);
    await refetch({ input: next });
  };

  const tabChangeHandler = async (value: string) => {
    setTab(value);
    const next = { ...inquiry, page: 1, search: { ...inquiry.search } };
    if (value === 'ALL') delete next.search.noticeStatus;
    if (value === 'ACTIVE') next.search.noticeStatus = NoticeStatus.ACTIVE;
    if (value === 'HOLD') next.search.noticeStatus = NoticeStatus.HOLD;
    if (value === 'DELETE') next.search.noticeStatus = NoticeStatus.DELETE;
    setInquiry(next);
    await refetch({ input: next });
  };

  const searchHandler = async () => {
    const next = {
      ...inquiry,
      page: 1,
      search: { ...inquiry.search, text: searchText.trim() },
    };
    setInquiry(next);
    await refetch({ input: next });
  };

  const createHandler = async () => {
    try {
      await createNotice({
        variables: {
          input: {
            noticeCategory: NoticeCategory.NOTICE,
            noticeTitle: createForm.noticeTitle,
            noticeContent: createForm.noticeContent,
          },
        },
      });
      setCreateForm({ noticeTitle: '', noticeContent: '' });
      setOpenCreate(false);
      await refetch({ input: inquiry });
      await sweetTopSmallSuccessAlert(t('Notice created'), 900);
    } catch (err: any) {
      sweetMixinErrorAlert(err?.message ?? t('Error')).then();
    }
  };

  const openEditHandler = (target: Notice) => {
    setEditForm({ _id: target._id, noticeTitle: target.noticeTitle, noticeContent: target.noticeContent });
    setOpenEdit(true);
  };

  const editHandler = async () => {
    try {
      await updateNotice({
        variables: {
          input: {
            _id: editForm._id,
            noticeTitle: editForm.noticeTitle,
            noticeContent: editForm.noticeContent,
          },
        },
      });
      setOpenEdit(false);
      await refetch({ input: inquiry });
      await sweetTopSmallSuccessAlert(t('Notice updated'), 900);
    } catch (err: any) {
      sweetMixinErrorAlert(err?.message ?? t('Error')).then();
    }
  };

  const toggleStatusHandler = async (target: Notice) => {
    try {
      await updateNotice({
        variables: {
          input: {
            _id: target._id,
            noticeStatus:
              target.noticeStatus === NoticeStatus.ACTIVE
                ? NoticeStatus.HOLD
                : NoticeStatus.ACTIVE,
          },
        },
      });
      await refetch({ input: inquiry });
    } catch (err: any) {
      sweetMixinErrorAlert(err?.message ?? t('Error')).then();
    }
  };

  const removeHandler = async (id: string) => {
    try {
      await removeNotice({ variables: { noticeId: id } });
      await refetch({ input: inquiry });
    } catch (err: any) {
      sweetMixinErrorAlert(err?.message ?? t('Error')).then();
    }
  };

  return (
    <Box component={'div'} className={'content cs-admin-page'}>
      <Box className={'title flex_space'}>
        <Typography variant={'h2'}>{t('Notice Management')}</Typography>
        <Button variant={'contained'} onClick={() => setOpenCreate(true)}>
          {t('Add Notice')}
        </Button>
      </Box>

      <Box className={'table-wrap'}>
        <List className={'tab-menu'}>
          <ListItem onClick={() => tabChangeHandler('ALL')} className={tab === 'ALL' ? 'li on' : 'li'}>{t('All')}</ListItem>
          <ListItem onClick={() => tabChangeHandler('ACTIVE')} className={tab === 'ACTIVE' ? 'li on' : 'li'}>{t('Active')}</ListItem>
          <ListItem onClick={() => tabChangeHandler('HOLD')} className={tab === 'HOLD' ? 'li on' : 'li'}>{t('Hold')}</ListItem>
          <ListItem onClick={() => tabChangeHandler('DELETE')} className={tab === 'DELETE' ? 'li on' : 'li'}>{t('Deleted')}</ListItem>
        </List>
        <Divider />
        <Stack className={'search-area'} sx={{ m: '24px' }}>
          <OutlinedInput
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ width: '100%' }}
            className={'search'}
            placeholder={t('Search notice')}
            onKeyDown={(event) => {
              if (event.key === 'Enter') searchHandler();
            }}
            endAdornment={
              <>
                {searchText && (
                  <CancelRoundedIcon
                    style={{ cursor: 'pointer' }}
                    onClick={async () => {
                      setSearchText('');
                      const next = { ...inquiry, search: { ...inquiry.search, text: '' }, page: 1 };
                      setInquiry(next);
                      await refetch({ input: next });
                    }}
                  />
                )}
                <InputAdornment position="end" onClick={searchHandler}>
                  <img src="/img/icons/search_icon.png" alt={'searchIcon'} />
                </InputAdornment>
              </>
            }
          />
        </Stack>
        <Divider />

        <Stack gap={1.2} sx={{ p: '14px' }}>
          {noticeList.map((notice) => (
            <Stack key={notice._id} sx={{ border: '1px solid #ececec', borderRadius: '10px', p: '14px', background: '#fff' }}>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant={'h6'}>{notice.noticeTitle}</Typography>
                <Chip
                  size={'small'}
                  label={notice.noticeStatus}
                  color={notice.noticeStatus === NoticeStatus.ACTIVE ? 'success' : 'default'}
                />
              </Stack>
              <Divider sx={{ my: '8px' }} />
              <Typography sx={{ mb: '8px', color: '#424242' }}>{notice.noticeContent}</Typography>
              <Stack direction={'row'} gap={1}>
                <Button size={'small'} variant={'outlined'} onClick={() => openEditHandler(notice)}>
                  {t('Edit')}
                </Button>
                <Button size={'small'} variant={'outlined'} onClick={() => toggleStatusHandler(notice)}>
                  {notice.noticeStatus === NoticeStatus.ACTIVE ? t('Set HOLD') : t('Set ACTIVE')}
                </Button>
                <Button size={'small'} color={'error'} variant={'outlined'} onClick={() => removeHandler(notice._id)}>
                  {t('Delete')}
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component="div"
          count={total}
          rowsPerPage={inquiry.limit}
          page={inquiry.page - 1}
          onPageChange={changePageHandler}
          onRowsPerPageChange={changeRowsPerPageHandler}
        />
      </Box>

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth maxWidth={'sm'}>
        <DialogTitle>{t('Create Notice')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('Title')}
            fullWidth
            value={createForm.noticeTitle}
            onChange={(e) => setCreateForm({ ...createForm, noticeTitle: e.target.value })}
          />
          <TextField
            margin="dense"
            label={t('Content')}
            fullWidth
            multiline
            minRows={4}
            value={createForm.noticeContent}
            onChange={(e) => setCreateForm({ ...createForm, noticeContent: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>{t('Cancel')}</Button>
          <Button onClick={createHandler} variant={'contained'}>{t('Create')}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth={'sm'}>
        <DialogTitle>{t('Edit Notice')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('Title')}
            fullWidth
            value={editForm.noticeTitle}
            onChange={(e) => setEditForm({ ...editForm, noticeTitle: e.target.value })}
          />
          <TextField
            margin="dense"
            label={t('Content')}
            fullWidth
            multiline
            minRows={4}
            value={editForm.noticeContent}
            onChange={(e) => setEditForm({ ...editForm, noticeContent: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>{t('Cancel')}</Button>
          <Button onClick={editHandler} variant={'contained'}>{t('Save')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default withAdminLayout(AdminNotice);
