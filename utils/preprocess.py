"""
This file is for preprocess csv files for 2nd idea
"""
import json
import re

def cal_data(acct_file, ser_file, ind_filter=None, acc_filter=None, writepath='../results/results_2nd.csv'):
    """
    This function will combine information from two files.
    1: Services.csv; 2. Accounts.csv
    The function will calculate how much each industry spend on our services.
    The statistics will calculate three layers:
        industry-> account_id-> services

    Parameters:
        acct_file: the file path of Accounts.csv
        ser_file: the file path of Services.csv
        ind_filter: filter set 4 industry, any within the set will be excluded;
        acc_filter: filter set 4 account, any within the set will be excluded;
        writepath: path to save final results
    """
    # Dict of Account - Accumulated Service Fee
    acct_ser_dict = dict()
    # Dict of Account - Industry
    acct_ind_dict = dict()
    # Dict of Account - Service Fees,
    # this one measures how much each company spend on our services
    ind_prof_dict = dict()

    # load data from Services.csv
    with open(ser_file) as serf:
        serf.readline() # skip the 1st line of column names
        for line in serf:
            # parse each line
            infos = line.split('\t')

            tmp = infos[2].split('$')[1].strip()
            if len(tmp) < 2:
                continue
            try:
                profits = float(re.findall(r'[\d|\.]+', infos[2])[0])
            except ValueError:
                print(tmp)
                continue

            acc_id = infos[1]
            if acc_id in acct_ser_dict:
                acct_ser_dict[acc_id] += profits
            else:
                acct_ser_dict[acc_id] = profits

    # load data from Accounts.csv
    with open(acct_file) as acctf:
        acctf.readline() # skip column names
        for line in acctf:
            infos = line.split(',')
            acc_id = infos[0].strip()
            if acc_id in acct_ser_dict: # check if the account id exist
                ind_name = infos[1].strip() # industrial name
                # Accumulate value for each industry
                if ind_name in ind_prof_dict:
                    ind_prof_dict[ind_name] += acct_ser_dict[acc_id]
                else:
                    ind_prof_dict[ind_name] = acct_ser_dict[acc_id]

    # save data to json in file
    write2csv(writepath, ind_prof_dict)

def write2csv(path, object1):
    """
    Write dictionary object into csv format;
    Parameters:
        path - the path to save the file
        object1 - the dictionary object
    """
    with open(path, 'w') as writef:
        for key in object1:
            writef.write(str(key) + ',' + str(object1[key]) + '\n')

def write2json(path, object1):
    with open(path, 'wb') as writef:
        writef.write(json.dumps(object1,
            ensure_ascii=False,sort_keys=True,
            indent=4).encode('utf-8', 'replace'))

def cal_group(ser_file, group_filter=None,  writepath='../results/results_3rd.csv'):
    """
    This function calculates how much money each product group earn

    Parameters:
        ser_file - Services.csv path
        group_filter - the filter set for keeping groups
        writepath - the file where the results will be saved
    """
    group_profits = dict()
    with open(ser_file) as datafile:
        datafile.readline() # skip the 1st line
        for line in datafile:
            infos = line.split('\t')

            tmp = infos[2].split('$')[1].strip()
            if len(tmp) < 2:
                continue
            try:
                profits = float(re.findall(r'[\d|\.]+', infos[2])[0])
            except ValueError:
                print(tmp)
                continue

            group_id = infos[4].strip()
            if len(group_id) < 3:
                continue
            if group_id in group_profits:
                group_profits[group_id] += profits
            else:
                group_profits[group_id] = profits
    # Save to file
    write2csv(writepath, group_profits)
    print(group_profits)

if __name__ == '__main__':
    import sys
    cal_data(sys.argv[1], sys.argv[2])
    #cal_group(sys.argv[1])
