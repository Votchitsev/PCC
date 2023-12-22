import { ApiClient } from '@api/index';
import { EAPIRoutes, ERoutes } from '@lib/routes';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'store';

interface IProfileForm {
  firstName: string;
  lastName: string;
}

export function useProfileForm(initValues?: IProfileForm) {
  const { AuthStore } = useStore();
  const { authUser } = AuthStore;
  const navigate = useNavigate();

  const [profile, setProfile] = useState<IProfileForm>(initValues || {
    firstName: '',
    lastName: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (authUser) {
      const response = await ApiClient.post(EAPIRoutes.PROFILE, {
        first_name: profile.firstName,
        last_name: profile.lastName,
        user_id: authUser.id,
      }, {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });

      if (response.status === 200) {
        setLoading(false);
        navigate(`${ERoutes.PROFILE_ROOT}/${authUser.id}`);
        return;
      }

      setLoading(false);
      setError(response.statusText);
    }
  };

  return {
    profile,
    onChange,
    onSubmit,
    error,
    loading,
  };
};
