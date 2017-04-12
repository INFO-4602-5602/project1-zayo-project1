"""
This file is for preprocess csv files for 2nd idea
"""
import json
import re

def cal_data(acct_file, ser_file, ind_filter=None, acc_filter=None, writepath='./results.txt'):
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
            infos = line.split(',')

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
    with open(writepath, 'wb') as writef:
        writef.write(json.dumps(ind_prof_dict,
            ensure_ascii=False,sort_keys=True,
            indent=4).encode('utf-8', 'replace'))


if __name__ == '__main__':
    import sys
    cal_data(sys.argv[1], sys.argv[2])
