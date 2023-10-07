import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@main/components/card/card';
import { type IInspection } from '@inspections/entity';
import style from './index.module.scss';
import { ERoutes } from '@lib/routes';

interface IProps {
  readonly inspection: IInspection;
}

const InspectionItem = ({ inspection }: IProps) => {
  return (
    <Link to={ERoutes.INSPECTIONS_ROOT + '/' + inspection.id}>
      <Card>
        <div className={ style.date }>{ inspection.date }</div>
        <h3 className={ style.title }>{ inspection.department }</h3>
        <div className={ style.department_group }>{ inspection .department_group }</div>
      </Card>
    </Link>
  );
};

export default InspectionItem;
