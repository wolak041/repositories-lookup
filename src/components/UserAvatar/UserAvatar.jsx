import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'none',
    width: 34,
    height: 0,
  },
  imageLoaded: {
    display: 'initial',
    width: 34,
    height: 34,
    borderRadius: '50%',
  },
}));

const UserAvatar = ({ logoUrl }) => {
  const styles = useStyles();

  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isError, setError] = useState(false);

  return (
    <div className={styles.root}>
      {logoUrl && !isError ? (
        <>
          <img
            src={logoUrl}
            alt="user logo"
            onLoad={() => setImageLoaded(true)}
            onError={() => setError(true)}
            className={isImageLoaded ? styles.imageLoaded : styles.loading}
          />
          {!isImageLoaded && <Skeleton variant="circle" width={34} height={34} />}
        </>
      ) : (
        <AccountCircle className={styles.imageLoaded} />
      )}
    </div>
  );
};

UserAvatar.propTypes = {
  logoUrl: PropTypes.string,
};

export default UserAvatar;
