import React from 'react';
import ReportList from './ReportList';
import IssueReport from './IssueReport';

const ReportTemplate = () => {
  return (
    <div>
      <IssueReport />
      <ReportList />
    </div>
  );
};

export default ReportTemplate;
