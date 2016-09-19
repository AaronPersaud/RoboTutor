import sys
import time
import numpy as np
import json

'''
prev_attempt, current_s,  days = input()

time_test = 
int(time.time()-(days)*(60*60))

prev_attempt = float(prev_attempt)
current_s = float(current_s)
'''
'''
input_list = [
{'qid':1 , 's_score':20 , 'last_attempt':1 , 'last_seen': int(time.time()-(12)*(60*60))},
{'qid':2 , 's_score':14 , 'last_attempt':1 , 'last_seen': int(time.time()-(3)*(60*60))},
{'qid':3 , 's_score':40 , 'last_attempt':1 , 'last_seen': int(time.time()-(4)*(60*60))}, 
{'qid':43 , 's_score':1 , 'last_attempt': 1, 'last_seen':int(time.time()-(1)*(60*60))}, 
{'qid':123 , 's_score':12 , 'last_attempt':0 , 'last_seen': int(time.time()-(12)*(60*60))}, 
{'qid':52, 's_score':600, 'last_attempt': 0, 'last_seen': int(time.time()-(1)*(60*60))}] 
'''
data_list = []
for arg in sys.argv[1:]:
	data_list.append(json.loads(arg))
#print data_list

def _prob_(prev_attempt, current_s , last_seen):

	'''
	probability(int, double, long)
	prev_attempt = 0 or 1
	current_s = value from 0 - inf (technically not practically)
	long = epoch timestamp

	current_time = current epoch time stamp

	s = (current_s + prev_attempt)/2 - strength of memory based on previouse attempts and your current memory strength 
	
	r = exp(-t/s) the final score of forgetting

	'''
	
	current_stamp = int(time.time())

	s = float((current_s + prev_attempt) / 2)
	
	timer = float((current_stamp - last_seen)/(60*60))


	return np.exp(np.negative(timer/s))	

def list_set(data_list):
	
	out_list = []

	for question_dict in data_list:
		
		out_list.append({'qid':question_dict['qid'], 
		's_score' : question_dict['s_score'],
		'last_attempt': question_dict['last_attempt'],
		'last_seen' : question_dict['last_seen'],
		'topic': question_dict['topic'],
		'question' : question_dict['question'],
		'answer' : question_dict['answer'],
		'uid' : question_dict['uid'],
		'forget_value': _prob_(question_dict['last_attempt'], 
		question_dict['s_score'], question_dict['last_seen'])})

	return out_list

def sorting(out_list):
	def get_forget_value(adict):
		return adict['forget_value']
	sorted_out_list = sorted(out_list, key=get_forget_value)
#	print sorted_out_list
	return sorted_out_list


def entry(data_list):

	out_list = list_set(data_list)

	sorting(out_list)

	return json.dumps({"results":out_list})


print entry(data_list)
