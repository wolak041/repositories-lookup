import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  loading: {
    display: 'none',
    width: (props) => props.width,
    height: 0,
  },
  imageLoaded: {
    display: 'initial',
    width: (props) => props.width,
    height: (props) => props.height,
    borderRadius: '50%',
  },
});

const UserAvatar = ({ logoUrl, width = 34, height = 34 }) => {
  const styles = useStyles({ width, height });

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
          {!isImageLoaded && <Skeleton variant="circle" width={width} height={height} />}
        </>
      ) : (
        <AccountCircle className={styles.imageLoaded} />
      )}
    </div>
  );
};

UserAvatar.propTypes = {
  logoUrl: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default UserAvatar;
