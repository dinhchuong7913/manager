import * as React from 'react';
import { StyleRulesCallback, withStyles, WithStyles } from 'src/components/core/styles';
import Notice from 'src/components/Notice';

type ClassNames = 'root' | 'link';

const styles: StyleRulesCallback<ClassNames> = (theme) => ({
  root: {},
  link: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    }
  }
});

interface Props {
  text: string;
  type: string;
  onClick: (type: string) => void;
}

type CombinedProps = Props & WithStyles<ClassNames>;

const MigrationNotification : React.StatelessComponent<CombinedProps> = (props) => {
  const { classes, onClick, text, type } = props;

  const handleClick = () => {
    onClick(type);
  }

  return (
    <Notice important warning>
      {text}
      {type === 'migration_scheduled'
        ? ' To enter the migration queue right now, please '
        : ' To schedule your migration, please '
      }
      <span className={classes.link} onClick={handleClick}>click here</span>.
    </Notice>
  );
};

const styled = withStyles(styles);

export default styled(MigrationNotification);
