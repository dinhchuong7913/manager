import * as React from 'react';
import { connect } from 'react-redux';
import { StickyProps } from 'react-sticky';
import { StyleRulesCallback, withStyles, WithStyles } from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import Grid from 'src/components/Grid';
import { BackupsCTA } from 'src/features/Backups';
import DocComponent, { Doc } from './DocComponent';

type ClassNames = 'root'
  | 'title'
  | 'gridItem';

const styles: StyleRulesCallback<ClassNames> = (theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      position: 'relative !important',
      left: `${theme.spacing.unit}px !important`,
      width: '100%',
      paddingTop: theme.spacing.unit * 3,
    },
  },
  title: {
    fontSize: '1.5rem',
    color: theme.color.green,
  },
  gridItem: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    }
  }
});

interface Props {
  docs: Doc[];
  isSticky?: boolean;
}

type CombinedProps = Props & BackupCTAProps & StickyProps & WithStyles<ClassNames>;

const styled = withStyles(styles);

const DocsSidebar: React.StatelessComponent<CombinedProps> = (props) =>  {
  const { backupsCTA, classes, docs, style, isSticky } = props;

  if (docs.length === 0) {
    return null;
  }

  let stickyStyles;
  if (isSticky) {
    stickyStyles = {
      ...style,
      paddingTop: 24,
    };
  }

  return (
    <Grid container item style={stickyStyles} className={classes.root}>
      {backupsCTA &&
        <Grid item className={classes.gridItem}>
          <BackupsCTA />
        </Grid>
      }
      <Grid item className={classes.gridItem}>
      <Typography
        role="header"
        variant="h2"
        className={classes.title}
        data-qa-sidebar-title
      >
        Linode Docs
      </Typography>
      {
        docs.map((doc, idx) => <DocComponent key={idx} {...doc} />)
      }
      </Grid>
    </Grid>
  );
}

interface BackupCTAProps {
  backupsCTA: boolean;
}

const connected = connect((state: ApplicationState, ownProps) => ({
  backupsCTA: state.__resources.linodes.entities.filter(l => !l.backups.enabled).length > 0
}));

export default connected(styled(DocsSidebar));
