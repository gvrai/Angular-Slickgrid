import { FilterConditionOption, FieldType } from '../../models/index';
import { executeMappedCondition } from '../executeMappedCondition';

describe('dateEuroShortFilterCondition method', () => {
  it('should return False when no cell value is provided, neither search terms', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateEuroShort, cellValue: '' } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when any cell value is provided without any search terms', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateEuroShort, cellValue: '25/12/00' } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when search term is not a valid date', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateEuroShort, cellValue: '25/12/00', searchTerms: ['14/25/00'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value provided is equal to the searchTerms', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateEuroShort, cellValue: '25/12/93', searchTerms: ['25/12/93'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when cell value is not the same value as the searchTerm', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateEuroShort, cellValue: '25/12/93', searchTerms: ['14/03/03'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when the cell value is found in the searchTerms since it only compares first term', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateEuroShort, cellValue: '25/12/93', searchTerms: ['14/03/2003', '25/12/93'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when Operator is Not Equal and cell value equals the search term', () => {
    const options = { dataKey: '', operator: 'NE', fieldType: FieldType.dateEuroShort, cellValue: '25/12/93', searchTerms: ['25/12/93'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return True even when Operator is Not Equal and cell value is different than the search term', () => {
    const options = { dataKey: '', operator: 'NE', fieldType: FieldType.dateEuroShort, cellValue: '25/12/93', searchTerms: ['25/12/02'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when there are no search term and no operator', () => {
    const options = { dataKey: '', fieldType: FieldType.dateEuroShort, cellValue: '25/12/93', searchTerms: [null] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when search and cell values are different and there are no operator passed, it will use default EQ operator', () => {
    const options = { dataKey: '', fieldType: FieldType.dateEuroShort, cellValue: '25/12/93', searchTerms: ['27/12/93'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value is in the range of search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '25/12/93', fieldType: FieldType.dateEuroShort, searchTerms: ['01/12/93..31/12/93'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when input value is not in the range of search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '25/11/93', fieldType: FieldType.dateEuroShort, searchTerms: ['01/12/93..31/12/93'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value equals the search terms min inclusive value and operator is set to "rangeInclusive"', () => {
    const options = { dataKey: '', operator: 'RangeInclusive', cellValue: '01/12/93', fieldType: FieldType.dateEuroShort, searchTerms: ['01/12/93..31/12/93'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when input value equals the search terms min inclusive value and operator is set to "RangeExclusive"', () => {
    const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '01/12/93', fieldType: FieldType.dateEuroShort, searchTerms: ['01/12/93..31/12/93'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when any of the 2 search term value is not a valid date', () => {
    const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '05/12/93', fieldType: FieldType.dateEuroShort, searchTerms: ['01/12/93..60/12/93'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });
});
